import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ModalContentComponent } from './modal-content/modal-content.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
})
export class AppComponent {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
    ) {}

    async showModal(): Promise<void> {
        const { ModalComponent } = await import('./shared/components/modal/modal.component');

        const modalResolver = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
        const modalRef = this.viewContainerRef.createComponent(modalResolver);
        const { instance } = modalRef;

        instance.data = {
            title: 'This title is passed from caller',
            child: ModalContentComponent,
        };

        instance.dismissEvent$.pipe(takeUntil(instance.destroyed$)).subscribe({
            next: (data) => {
                console.log(data);
                modalRef.destroy();
            },
        });
    }
}
