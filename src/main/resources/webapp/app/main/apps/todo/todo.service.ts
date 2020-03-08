import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {TinyUtils} from '@tiny/utils';

import {Todo} from 'app/main/apps/todo/todo.model';
import {SERVER_API_URL} from "app/app.constants";
import {ResponseModel} from "./response.model";

@Injectable()
export class TodoService implements Resolve<any> {
    todos: Todo[];
    selectedTodos: Todo[];
    currentTodo: Todo;
    searchText: string;
    filters: any[];
    allTags: any[];
    routeParams: any;

    onUpdateAll: BehaviorSubject<any>;
    onTodosChanged: BehaviorSubject<any>;
    onSelectedTodosChanged: BehaviorSubject<any>;
    onCurrentTodoChanged: BehaviorSubject<any>;
    onFiltersChanged: BehaviorSubject<any>;
    onTaskTagsChanged: BehaviorSubject<any>;
    onAllTagsChanged: BehaviorSubject<any>;
    onSearchTextChanged: BehaviorSubject<any>;
    onNewTodoClicked: Subject<any>;
    onUserChanged: BehaviorSubject<any>;


    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {AccountService} accountService
     * @param {Location} _location
     */
    constructor(
        private _httpClient: HttpClient,
        private _location: Location
    ) {
        // Set the defaults
        this.selectedTodos = [];
        this.searchText = '';
        this.onUpdateAll = new BehaviorSubject([]);
        this.onTodosChanged = new BehaviorSubject([]);
        this.onSelectedTodosChanged = new BehaviorSubject([]);
        this.onCurrentTodoChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onTaskTagsChanged = new BehaviorSubject([]);
        this.onAllTagsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
        this.onNewTodoClicked = new Subject();
        this.onUserChanged = new BehaviorSubject([]);
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        console.log('ok')
        return new Promise((resolve, reject) => {
                Promise.all([
                    this.getFilters(),
                    this.getTags(),
                    this.getTodos()
                ]).then(() => {
                    if (this.routeParams.todoId) {
                        this.setCurrentTodo(this.routeParams.todoId);
                    } else {
                        this.setCurrentTodo(null);
                    }
                    this.onUpdateAll.subscribe(value => {
                        this.getTodos();
                    });

                    this.onSearchTextChanged.subscribe(searchText => {
                        if (searchText !== '') {
                            this.searchText = searchText;
                            this.getTodos();
                        } else {
                            this.searchText = searchText;
                            this.getTodos();
                        }
                    });
                    resolve();
                });
                resolve();
            },
        );
    }

    /**
     * Get all filters
     *
     * @returns {Promise<any>}
     */
    getFilters(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(SERVER_API_URL + '/filter')
                .subscribe((response: any) => {
                    this.filters = response.response;
                    this.onFiltersChanged.next(this.filters);
                    resolve(this.filters);
                }, reject);
        });
    }

    /**
     * Get all tags
     *
     * @returns {Promise<any>}
     */
    getTags(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(SERVER_API_URL + '/tag')
                .subscribe((response: any) => {
                    this.allTags = response.response;
                    this.onAllTagsChanged.next(this.allTags);
                    resolve(this.allTags);
                }, reject);
        });
    }

    /**
     * Get todos
     *
     * @returns {Promise<Todo[]>}
     */
    getTodos(): Promise<Todo[]> {
        if (this.routeParams.tagHandle) {
            return this.getTodosByTag(this.routeParams.tagHandle);
        }

        if (this.routeParams.filterHandle) {
            return this.getTodosByFilter(this.routeParams.filterHandle);
        }

        return this.getTodosByParams(this.routeParams);
    }

    /**
     * Get todos by params
     *
     * @param handle
     * @returns {Promise<Todo[]>}
     */
    getTodosByParams(handle): Promise<Todo[]> {
        return new Promise((resolve, reject) => {
            this._httpClient.get<ResponseModel>(SERVER_API_URL + '/task/')
                .subscribe((todos: ResponseModel) => {
                    this.todos = todos.response.map(todo => {
                        return new Todo(todo);
                    });

                    this.todos = TinyUtils.filterArrayByString(this.todos, this.searchText);

                    this.onTodosChanged.next(this.todos);
                    resolve(this.todos);
                }, reject);
        });
    }

    /**
     * Get todos by filter
     *
     * @param handle
     * @returns {Promise<Todo[]>}
     */
    getTodosByFilter(handle): Promise<Todo[]> {

        let param = handle + '=true';

        if (handle === 'dueDate') {
            param = handle + '=^$|\\s+';
        }

        return new Promise((resolve, reject) => {

            this._httpClient.get(SERVER_API_URL + '/task/' +
                '?' + param)
                .subscribe((todos: ResponseModel) => {

                    this.todos = todos.response.map(todo => {
                        return new Todo(todo);
                    });

                    this.todos = TinyUtils.filterArrayByString(this.todos, this.searchText);

                    this.onTodosChanged.next(this.todos);

                    resolve(this.todos);

                }, reject);
        });
    }


    /**
     * Delete todo by id
     *
     * @param handle
     * @returns {Promise<Todo>}
     */
    deleteTask(): Promise<Todo> {
        return new Promise((resolve, reject) => {
            this.selectedTodos.map(todo => {
                this._httpClient.delete(SERVER_API_URL + '/task/'
                    + "/" + todo.id)
                    .subscribe((response: any) => {
                        resolve(todo);
                    }, reject);
            });
        });
    }

    /**
     * Get todos by tag
     *
     * @param handle
     * @returns {Promise<Todo[]>}
     */
    getTodosByTag(handle): Promise<Todo[]> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(SERVER_API_URL + '/task/' +
                '?handle=' + handle)
                .subscribe((tags: any) => {

                    const tagId = tags.response[0].id;

                    this._httpClient.get(SERVER_API_URL + '/task?taskTags=' + tagId)
                        .subscribe((todos: ResponseModel) => {

                            this.todos = todos.response.map(todo => {
                                return new Todo(todo);
                            });

                            this.todos = TinyUtils.filterArrayByString(this.todos, this.searchText);

                            this.onTodosChanged.next(this.todos);

                            resolve(this.todos);

                        }, reject);
                });
        });
    }

    /**
     * Toggle selected todo by id
     *
     * @param id
     */
    toggleSelectedTodo(id): void {
        // First, check if we already have that todo as selected...
        if (this.selectedTodos.length > 0) {
            for (const todo of this.selectedTodos) {
                // ...delete the selected todo
                if (todo && todo.id === id) {
                    const index = this.selectedTodos.indexOf(todo);

                    if (index !== -1) {
                        this.selectedTodos.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedTodosChanged.next(this.selectedTodos);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedTodos.push(
            this.todos.find(todo => {
                return todo.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedTodosChanged.next(this.selectedTodos);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedTodos.length > 0) {
            this.deselectTodos();
        } else {
            this.selectTodos();
        }

    }

    /**
     * Select todos
     *
     * @param filterParameter
     * @param filterValue
     */
    selectTodos(filterParameter?, filterValue?): void {
        this.selectedTodos = [];

        // If there is no filter, select all todos
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedTodos = this.todos;
        } else {
            this.selectedTodos.push(...
                this.todos.filter(todo => {
                    return todo[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedTodosChanged.next(this.selectedTodos);
    }

    /**
     * Deselect todos
     */
    deselectTodos(): void {
        this.selectedTodos = [];

        // Trigger the next event
        this.onSelectedTodosChanged.next(this.selectedTodos);
    }

    /**
     * Set current todo by id
     *
     * @param id
     */
    setCurrentTodo(id): void {
        this.currentTodo = this.todos.find(todo => {
            return todo.id === id;
        });

        this.onCurrentTodoChanged.next([this.currentTodo, 'edit']);

        const tagHandle = this.routeParams.tagHandle,
            filterHandle = this.routeParams.filterHandle;

        if (tagHandle) {
            this._location.go('apps/todo/tag/' + tagHandle + '/' + id);
        } else if (filterHandle) {
            this._location.go('apps/todo/filter/' + filterHandle + '/' + id);
        } else {
            this._location.go('apps/todo/all/' + id);
        }
    }

    /**
     * Toggle tag on selected todos
     *
     * @param tagId
     */
    toggleTagOnSelectedTodos(tag): void {
        this.selectedTodos.map(todo => {
            this.toggleTagOnTodo(tag, todo);
        });
    }

    /**
     * Toggle tag on todo
     *
     * @param tag
     * @param todo
     */
    toggleTagOnTodo(tag, todo): void {
        let index = JSON.stringify(todo.tags).includes(JSON.stringify(tag));
        if (index) {
            todo.tags.splice(index, 1);
        } else {
            todo.tags.push(tag);
        }
        this.onTaskTagsChanged.next(todo.tags);
        this.updateTodo(todo);
    }

    /**
     * Has tag?
     *
     * @param tag
     * @param taskTags
     * @returns {boolean}
     */
    hasTag(tag, taskTags): any {
        if (!taskTags) {
            return false;
        }
        return JSON.stringify(taskTags).includes(JSON.stringify(tag));
    }

    /**
     * Update the todo
     *
     * @param todo
     * @returns {Promise<any>}
     */
    updateTodo(todo): any {
        console.log('put into:' + JSON.stringify(todo));
        return new Promise((resolve, reject) => {
            this._httpClient.put(SERVER_API_URL + '/task/' + todo.id, {...todo})
                .subscribe(response => {
                    this.getTodos().then(todos => {
                        resolve(todos);

                    }, reject);
                });
        });
    }

    /**
     * Update the todo
     *
     * @param todo
     * @returns {Promise<any>}
     */
    updateStartDate(todo, startDate): any {
        if (!startDate) {
            return null;
        }
        //this.currentTodo.startDate = startDate;
        console.log('put into:' + JSON.stringify(todo));
        return new Promise((resolve, reject) => {
            this._httpClient.put(SERVER_API_URL + '/task/'
                + this.currentTodo.id, {...this.currentTodo})
                .subscribe(response => {
                    this.getTodos().then(todos => {
                        resolve(todos);

                    }, reject);
                });
        });
    }

    /**
     * Save the todo
     *
     * @param todo
     * @returns {Promise<any>}
     */
    saveTodo(todo): any {
        return new Promise((resolve, reject) => {
            this._httpClient.post(SERVER_API_URL + '/task/', {...todo})
                .subscribe(response => {
                    this.getTodos().then(todos => {

                        resolve(todos);

                    }, reject);
                });
        });
    }
}
