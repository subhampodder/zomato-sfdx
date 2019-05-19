import { LightningElement,wire,track } from 'lwc';
//import { fireEvent } from 'c/pubsub';
import searchReviews from '@salesforce/apex/zomatoClass.searchReviews';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class ZomatoSelectedRes extends LightningElement {
    resid;

    @track review = [];
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        console.log('In connectedCallBack .... ');
        registerListener('restaurantIdUpdate', this.handleResId, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleResId(restaurauntId) {
        //console.log('In handleRestaurants in ZomatoDisplayRestaurants');
        //console.log('restaurants in handle', restaurants);
        this.resid = restaurauntId;
        console.log('this.restaurauntId', this.resid);

        if(this.resid !== undefined){
            searchReviews({'resId' : this.resid})
            .then(result => {
                const output = JSON.parse(result);
                this.error = undefined
                console.log("revws::::", output);
                this.review = output;
                console.log('revieww : ::: ',this.review)
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                console.log("error", JSON.stringify(this.error));
            });
        }
        else{
            console.log("No info returned in call back");
        }
    }
}