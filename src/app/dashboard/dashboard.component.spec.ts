import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GiftHttpService } from '../providers/gift.httpService';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
    let comp: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(() => {
        const giftHttpServiceStub = {
            getGiftes: () => ({
                then: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [ DashboardComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: GiftHttpService, useValue: giftHttpServiceStub }
            ]
        });
        fixture = TestBed.createComponent(DashboardComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('gifts defaults to: []', () => {
        expect(comp.gifts).toEqual([]);
    });

    /*Nesting describe? Mocking the async service may needs extra async setup*/
    // describe('ngOnInit', () => {
    //     it('makes expected calls', () => {
    //         const giftHttpServiceStub = fixture.debugElement.injector.get(GiftHttpService);
    //         spyOn(giftHttpServiceStub, 'getGiftes');
    //         comp.ngOnInit();
    //         expect(giftHttpServiceStub.getGiftes).toHaveBeenCalled();
    //     });
    // });

});
