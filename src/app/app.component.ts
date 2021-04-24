import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Medical';
  constructor() {
    var firebaseConfig = {
      apiKey: 'AIzaSyATU1g_oUK0AOLb6RoNPwjvaV93a17BLSI',
      authDomain: 'medical-b7967.firebaseapp.com',
      projectId: 'medical-b7967',
      storageBucket: 'medical-b7967.appspot.com',
      messagingSenderId: '777663056757',
      appId: '1:777663056757:web:763cc6e29a16bd8493613c',
      measurementId: 'G-SZEBBPM1W1',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
