import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortId from 'shortid';
export const Links = new Mongo.Collection('links');

if(Meteor.isServer){
    Meteor.publish('linksPublication' ,function() { // w funkcji deklarujemy do jakich danych użytkownik powinien mieć dostęp
        // funkcja wywołuje się z każdym razę kiedy użytkownik subskrybuje do publish
        return Links.find({userId: this.userId});
    
    });
}

Meteor.methods({
    'link.insert'(url){
        if(!this.userId){
            throw new Meteor.Error('not-autorized');
        }

        //przekazujemy błąd z serwera do parametru err w komponencie signup do funkcji Account.Createuser
            new SimpleSchema({ //tworzenie walidacji dla url i zgłasznie błędu jeśli niewłaściwa
              url:{
                type:String,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url
              }
            }).validate({ url });

        Links.insert({
            _id: shortId.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisited: null
        })
    },
    'links.setVisibility'(_id, visible){
        if(!this.userId){
            throw new Meteor.Error('not-autorized');
        }
        new SimpleSchema({
            _id:{
                type: String,
                min:2

            },
            visible:{
                type: Boolean
            }
        }).validate({_id, visible});

        Links.update({
            _id,
            userId: this.userId,
        }, {
            $set: {visible}
        });
    },
    'links.trackVisit'(_id){
        console.log("trackVisit")
        new SimpleSchema({
            _id:{
                type: String,
                min:1
            }
        }).validate({_id});
        Links.update({_id}, {
            $set:{
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        })
    }

});
 

 