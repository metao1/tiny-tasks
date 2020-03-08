import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

import {TinyUtils} from '@tiny/utils';
import {TinyAnimations} from '@tiny/animations';

import {Todo} from 'app/main/apps/todo/todo.model';
import {TodoService} from 'app/main/apps/todo/todo.service';
import {TinyAlertService} from "@tiny/services/alert.service";
import * as moment from 'moment';

@Component({
    selector: 'todo-details',
    templateUrl: './todo-details.component.html',
    styleUrls: ['./todo-details.component.scss'],
    animations: TinyAnimations
})
export class TodoDetailsComponent implements OnInit, OnDestroy {

    todo: Todo;
    tags: any[];
    formType: string;

    maxDate: moment.Moment = moment().endOf('day');

    createdForm: FormGroup;

    @Output() readonly selectionChanged = new EventEmitter();

    datechanged(type, event): void {
        if (type === 'startDate') {
            this._todoService.updateTodo(
                {'id':this.todo.id,
                    'title':this.todo.title,
                    'notes': this.todo.notes,
                    'completed': this.todo.completed,
                    'starred': this.todo.starred,
                    'startDate':event,
                    'dueDate': this.todo.dueDate,
                    'important': this.todo.important,
                    'deleted': this.todo.deleted,
                    'tags': this.todo.tags
                }
            );
        } else {
            this._todoService.updateTodo(
                {'id':this.todo.id,
                    'title':this.todo.title,
                    'notes': this.todo.notes,
                    'completed': this.todo.completed,
                    'starred': this.todo.starred,
                    'startDate': this.todo.startDate,
                    'dueDate': event,
                    'important': this.todo.important,
                    'deleted': this.todo.deleted,
                    'tags': this.todo.tags
                }
            );
        }
    }

    private dateOrderValidator(form: FormGroup): any {
        return true;
    }

    @ViewChild('titleInput')
    titleInputField;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {TodoService} _todoService
     * @param {FormBuilder} _formBuilder
     * @Param {TinyAlertService} _tinyAlertService

     */
    constructor(
        private _todoService: TodoService,
        private _formBuilder: FormBuilder,
        private _tinyAlertService: TinyAlertService
    ) {
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
        // Subscribe to update the current todo
        this._todoService.onCurrentTodoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(([todo, formType]) => {
                if (todo && formType === 'edit') {
                    this.formType = 'edit';
                    this.todo = todo;
                    this.createdForm = this.createTodoForm();
                    let startDate = moment(this.todo.startDate).toDate();
                    this.createdForm.get('startDate').setValue(startDate);
                    let dueDate = moment(this.todo.dueDate).toDate();
                    this.createdForm.get('dueDate').setValue(dueDate);
                    this.createdForm.valueChanges
                        .pipe(
                            takeUntil(this._unsubscribeAll),
                            debounceTime(500),
                            distinctUntilChanged()
                        )
                        .subscribe(data => {
                            this._todoService.updateTodo(data);
                        });
                }
            });

        // Subscribe to update on tag change
        this._todoService.onTaskTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                if (this.todo) {
                    this.todo.tags = labels;
                }
            });

        // Subscribe to update on tag change
        this._todoService.onAllTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tags => {
                this.tags = tags;
            });

        // Subscribe to update on tag change
        this._todoService.onNewTodoClicked
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.todo = new Todo({});
                this.todo.id = TinyUtils.generateGUID();
                this.formType = 'new';
                this.createdForm = this.createTodoForm();
                this.focusTitleField();
                this._todoService.onCurrentTodoChanged.next([this.todo, 'new']);
            });
        this.maxDate = moment().endOf('day'); // update current time

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll
            .next();
        this._unsubscribeAll
            .complete();
    }

// -----------------------------------------------------------------------------------------------------
// @ Public methods
// -----------------------------------------------------------------------------------------------------

    /**
     * Focus title field
     */
    focusTitleField(): void {
        setTimeout(() => {
            this.titleInputField.nativeElement.focus();
        });
    }

    /**
     * Create todo form
     *
     * @returns {FormGroup}
     */
    createTodoForm(): FormGroup {
        return this._formBuilder.group({
            'id': [this.todo.id],
            'title': [this.todo.title],
            'notes': [this.todo.notes],
            'startDate': [this.todo.startDate],
            'dueDate': [this.todo.dueDate],
            'completed': [this.todo.completed],
            'starred': [this.todo.starred],
            'important': [this.todo.important],
            'deleted': [this.todo.deleted],
            'tags': [this.todo.tags]
        }, [this.dateOrderValidator]);
    }

    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event)
        :
        void {
        event.stopPropagation();
        this.todo.toggleStar();
        this._todoService.updateTodo(this.todo);
    }

    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event)
        :
        void {
        event.stopPropagation();
        this.todo.toggleImportant();
        this._todoService.updateTodo(this.todo);
    }

    /**
     * Toggle Completed
     *
     * @param event
     */
    toggleCompleted(event)
        :
        void {
        event.stopPropagation();
        this.todo.toggleCompleted();
        this._todoService.updateTodo(this.todo);
    }

    /**
     * Toggle Deleted
     *
     * @param event
     */
    toggleDeleted(event)
        :
        void {
        event.stopPropagation();
        this.todo.toggleDeleted();
        this._todoService.updateTodo(this.todo);
    }

    /**
     * Toggle tag on todo
     *
     * @param tag
     */
    toggleTagOnTodo(tag): void {
        this._todoService.toggleTagOnTodo(tag, this.todo);
    }

    /**
     * Has tag?
     *
     * @param tag
     * @returns {any}
     */
    hasTag(tag)
        :
        any {
        return this._todoService.hasTag(tag, this.todo.tags);
    }

    /**
     * Resize dynamically
     */
    minHeight: number = 64;
    height: number = this.minHeight;
    @ViewChild('hiddenText') textEl: ElementRef;

    resize() {
        setTimeout(() => this.height = Math.max(this.minHeight, this.textEl.nativeElement.offsetHeight));
    }

    /**
     * Add todo
     */
    addTodo(): void {
        let updateTodoPromise = this._todoService.saveTodo(this.createdForm.getRawValue());
        updateTodoPromise.then(fulfilled => {
            // yay, you got a new phone
            this._tinyAlertService.openSnackBar('Task saved successfully!', 'CLOSE');
        }).catch(error => {
            // ops, mom don't buy it
            console.log(error.message);
            this._tinyAlertService.openSnackBar('Error! Task not saved!', 'CLOSE');
        });

    }
}
