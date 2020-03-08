import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter, MatDatepickerInputEvent} from '@angular/material';
import {CustomErrorStateMatcher} from "./custom-error-state-matcher";

// tslint:disable-next-line:no-duplicate-imports

@Component({
    selector: 'app-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // tslint:disable-next-line:no-forward-ref
            useExisting: forwardRef(() => InputDateComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            // tslint:disable-next-line:no-forward-ref
            useExisting: forwardRef(() => InputDateComponent),
            multi: true
        }
    ]
})
export class InputDateComponent implements ControlValueAccessor, OnInit {

    planModel: any = {start_time: new Date()};

    dateControl = new FormControl('', []);
    minDate: Date;
    maxDate: Date;
    startDate: string;
    isRequired = false;
    errorMatcher = new CustomErrorStateMatcher();

    @Input()
    public set min(min: any) {
        this.minDate = moment(min).toDate();
        this.updateValidators();
    }

    @Input()
    public set max(max: any) {
        this.maxDate = moment(max).toDate();
        this.updateValidators();
    }

    @Input()
    public set start(start: any) {
        if (start) {
            let date = moment.unix(start).format("MM/DD/YYYY");
            if (date) {
                this.startDate = date;
                this.planModel.start_time = new Date(start*1000);
            }
        } else {
            console.log('start is null');
        }
    }

    @Input()
    public set disabled(value: boolean) {
        if (value) {
            this.dateControl.disable();
        } else {
            this.dateControl.enable();
        }
    }

    @Input()
    public set required(req: boolean) {
        this.isRequired = req;
        this.updateValidators();
    }

    @Input() placeholder: string;

    @Input()
    public set value(v: string) {
        this.dateControl.setValue(v);
        this.dateControl.markAsPristine();
    }

    @Output() datechange = new EventEmitter<String>();

    constructor(private adapter: DateAdapter<any>) {

    }

    ngOnInit(): void {
        this.adapter.setLocale(moment.locale());
        this.dateControl.valueChanges.subscribe(v => {
            if (v instanceof moment) {
                this.propagateChange((v as moment.Moment).toDate());
            } else if (v instanceof Date) {
                this.propagateChange(v);
            } else {
                this.propagateChange(null);
            }
        });
    }

    dateChange($event: MatDatepickerInputEvent<moment.Moment>): void {
        if ($event.target.value === null) {
            this.dateControl.setErrors({invalidDate: {}});
        }
        this.datechange.emit($event.value.format('X'));
    }

    propagateChange = (_: any) => {
    };

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn): void {
    }

    writeValue(value: string): void {
        this.adapter.setLocale(moment.locale());
        this.dateControl.setValue(value, {onlySelf: true});
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    clear(): void {
        this.dateControl.setValue(null);
        this.dateControl.setErrors(null);
        this.dateControl.markAsPristine();
    }

    onKeyPressEnter($event: KeyboardEvent): void {
        $event.preventDefault();
    }

    public validate(control: AbstractControl): any {
        return this.dateControl.errors;
    }

    private dateMaxValidator(maxDate: Date | moment.Moment): ValidatorFn {
        return (control: FormControl): any => {
            const value = control.value;
            if (value === null || value === undefined) {
                return null;
            }
            // value is in UTC, so we need to set local for comparison
            const t = moment(maxDate).endOf('day');
            const d = moment(value).local(true).endOf('day');
            if (d.isAfter(t)) {
                return {maxDate: {max: moment(maxDate).format('L')}};
            }
        };
    }

    private dateMinValidator(minDate: Date | moment.Moment): ValidatorFn {
        return (control: FormControl): any => {
            const value = control.value;
            if (value === null || value === undefined) {
                return null;
            }
            // value is in UTC, so we need to set local for comparison
            const t = moment(minDate).endOf('day');
            const d = moment(value).local(true).endOf('day');
            if (d.isBefore(t)) {
                return {minDate: {min: moment(minDate).format('L')}};
            }
        };
    }

    private updateValidators(): void {
        const validators = Array<ValidatorFn>();

        if (this.isRequired) {
            validators.push(Validators.required);
        }
        if (this.minDate) {
            validators.push(this.dateMinValidator(this.minDate));
        }

        if (this.maxDate) {
            validators.push(this.dateMaxValidator(this.maxDate));
        }

        if (validators.length) {
            this.dateControl.setValidators(validators);
        }
    }

}
