import { LightningElement, wire, track} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { fireEvent } from 'c/pubsub';

export default class ZomatoDisplayRestaurants extends LightningElement {
    selectedRes = '';

    @track restaurantsList = [];

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        //console.log('In connectedCallBack in ZomatoDisplayRestaurants');
        registerListener('restaurantListUpdate', this.handleRestaurants, this);
    }

    disconnectedCallback() {
        //console.log('In disconnectedCallback in ZomatoDisplayRestaurants');
        unregisterAllListeners(this);
    }

    handleRestaurants(restaurants) {
        //console.log('In handleRestaurants in ZomatoDisplayRestaurants');
        //console.log('restaurants in handle', restaurants);
        //const output001 = JSON.parse(restaurants);
        this.restaurantsList = restaurants;
        //console.log('this.restaurantsList', this.restaurantsList);
    }

    handleRestaurantSelected(event) {
        this.restaurantSelected = event.target.dataset.id;
        console.log('++++  ',this.restaurantSelected);
        //console.log('reslist  ',this.restaurantsList);
        //console.log('event.type', event.type);
        //console.log('event.target.value', event.target.value);
        console.log('event.target', JSON.stringify(this.restaurantSelected));
        //console.log('event.currentTarget', JSON.stringify(event.currentTarget));
        //console.log('this.restaurantSelected', this.restaurantSelected);
        if(this.restaurantSelected !== undefined){
            fireEvent(this.pageRef, 'restaurantIdUpdate', this.restaurantSelected);
        }
        else {
            console.log("No info returned in call back select");
        }
    }

    handleRestaurauntClick(event) {
        console.log('inside click');
        this.selectedRes = event.target.value;

    }
}