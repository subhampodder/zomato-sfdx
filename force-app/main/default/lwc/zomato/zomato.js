import { LightningElement, track, wire } from 'lwc';
import getLocation from '@salesforce/apex/zomatoClass.getLocation';
import { CurrentPageReference } from 'lightning/navigation';

/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 300;

export default class Zomato extends LightningElement {
    location = '';
    entityId = '';
    @track selectedLocation = '';
    entityType = '';
    restaurant = '';

    @track searchKey = '';

    @wire(CurrentPageReference) pageRef;

    @wire(getLocation, { locationName: '$searchKey' })
    location;


    handleLocationChange(event) {
        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, DELAY);
    }

}