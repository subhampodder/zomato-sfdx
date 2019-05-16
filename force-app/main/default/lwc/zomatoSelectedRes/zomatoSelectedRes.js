import { LightningElement,wire,track } from 'lwc';
//import { fireEvent } from 'c/pubsub';
import searchReviews from '@salesforce/apex/zomatoClass.searchReviews';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class ZomatoSelectedRes extends LightningElement {
    resid;

    @track review;
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
        //const output001 = JSON.parse(restaurants);
        this.resid = restaurauntId;
        console.log('this.restaurauntId', this.resid);

        if(this.resid !== undefined){
            searchReviews({'resId' : this.resid})
            .then(result => {
                const output = JSON.parse(result);
                this.error = undefined
                console.log("Location::::", output);
                this.review = output;
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                /*this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );*/
                console.log("error", JSON.stringify(this.error));
            });
        }
        else{
            console.log("No info returned in call back in selectLocation method");
        }
    }
}