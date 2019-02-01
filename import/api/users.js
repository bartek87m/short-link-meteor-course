import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => { //wywołuje się automatycznie przy tworzeniu nowego urzytkownika
    const email = user.emails[0].address;

     //przekazujemy błąd z serwera do parametru err w komponencie signup do funkcji Account.Createuser
      new SimpleSchema({
        email:{
          type:String,
          regEx: SimpleSchema.RegEx.Email
        }
      }).validate({ email });

    return true;
});