import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase/app';
import * as database from 'firebase/database';

@Injectable()
export class UserService {
  firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'pharmacydashboard-b9262.firebaseapp.com',
    databaseURL: 'https://pharmacydashboard-b9262.firebaseio.com',
    projectId: 'pharmacydashboard-b9262',
    storageBucket: 'pharmacydashboard-b9262.appspot.com',
    messagingSenderId: '127721288589',
    appId: '1:127721288589:web:44f97dec6ab3621a8dc3c4',
  };

  app = firebase.initializeApp(this.firebaseConfig);
  db = database.getDatabase();

  getUsers(): Promise<any> {
    try {
      return database.get(database.ref(this.db, 'subscriptions/'));
    } catch (error) {
      throw new Error(`Error fetching weather data`);
    }
  }

  subscribe(name: string, uid: number): void {
    database.set(database.ref(this.db, 'subscriptions/' + uid), {
      name: name,
    });
  }

  usubscribe(uid: number): void {
    database.remove(database.ref(this.db, 'subscriptions/' + uid));
  }
}
