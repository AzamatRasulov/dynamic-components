import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IModalInputData, IModalOutputData } from './modal-io-data.interface';

@Component({
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements AfterViewInit, OnDestroy {
    @Input() data!: IModalInputData;
    @Output() dismissEvent$ = new EventEmitter<IModalOutputData>();

    @ViewChild('modalBody', { read: ViewContainerRef }) modalBodyRef!: ViewContainerRef;

    destroyed$ = new Subject<boolean>();

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    ngAfterViewInit(): void {
        this.loadChild();
    }

    private loadChild(): void {
        const modalResolver = this.componentFactoryResolver.resolveComponentFactory(this.data.child);
        this.modalBodyRef.createComponent(modalResolver);
    }

    dismiss(data?: IModalOutputData): void {
        this.dismissEvent$.next(data);
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
