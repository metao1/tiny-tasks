import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

import {TinyAnimations} from '@tiny/animations';
import {TinySidebarService} from '@tiny/components/sidebar/sidebar.service';
import { Location } from '@angular/common';

import {Todo} from 'app/main/apps/todo/todo.model';
import {TodoService} from 'app/main/apps/todo/todo.service';
import {TinyAlertService} from "@tiny/services/alert.service";

@Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
    animations: TinyAnimations
})
export class TodoComponent implements OnInit, OnDestroy {
    hasSelectedTodos: boolean;
    isIndeterminate: boolean;
    filters: any[];
    tags: any[];
    searchInput: FormControl;
    currentTodo: Todo;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     * @param {TinySidebarService} _TinySidebarService
     * @param {_tinyAlertService} _tinyAlertService
     * @param {TodoService} _todoService
     */
    constructor(
        private _location: Location,
        private _TinySidebarService: TinySidebarService,
        private _tinyAlertService: TinyAlertService,
        private _todoService: TodoService
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._todoService.onSelectedTodosChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedTodos => {

                setTimeout(() => {
                    this.hasSelectedTodos = selectedTodos.length > 0;
                    if(this._todoService.todos) {
                        this.isIndeterminate = (selectedTodos.length !== this._todoService.todos.length && selectedTodos.length > 0);
                    }
                }, 0);
            });

        this._todoService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this._todoService.filters;
            });

        this._todoService.onAllTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tags => {
                this.tags = tags;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._todoService.onSearchTextChanged.next(searchText);
            });

        this._todoService.onCurrentTodoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(([currentTodo, formType]) => {
                if (!currentTodo) {
                    this.currentTodo = null;
                } else {
                    this.currentTodo = currentTodo;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Deselect current todo
     */
    deselectCurrentTodo(): void {
        this._todoService.onCurrentTodoChanged.next([null, null]);
        this._location.go('apps/todo/all');
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        this._todoService.toggleSelectAll();
    }

    /**
     * Select todos
     *
     * @param filterParameter
     * @param filterValue
     */
    selectTodos(filterParameter?, filterValue?): void {
        this._todoService.selectTodos(filterParameter, filterValue);
    }

    /**
     * Deselect todos
     */
    deselectTodos(): void {
        this._todoService.deselectTodos();
    }

    /**
     * Toggle tag on selected todos
     *
     * @param tagId
     */
    toggleTagOnSelectedTodos(tagId): void {
        this._todoService.toggleTagOnSelectedTodos(tagId);
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._TinySidebarService.getSidebar(name).toggleOpen();
    }

    deleteTask() {

        Promise.all([
            this._todoService.deleteTask()
        ]).then(
            (todo) => {
                this._todoService.onUpdateAll.next(todo);
                this.deselectTodos();
                this._tinyAlertService.openSnackBar("task deleted", "Close")
            },
        );
    }
}
