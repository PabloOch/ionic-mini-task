/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import {
  IonApp,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonList,
  setupIonicReact
} from '@ionic/react'

import { listCircle } from 'ionicons/icons';

setupIonicReact()

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const baseURL = "https://randomuser.me/api/?results=100";
  const [user, setUser] = useState([]);
  
  const loadUsers = async () => {
    const res = await axios.get(baseURL);
    setUser(res.data.results);
  }

  useEffect(()=> {
    loadUsers();
  },[])

  const delUser = (id:number) => {
    const tempUser = user.filter((u, index) => index != id)
    setUser(tempUser);
  }

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-indigo-700">Full Time Frontend Developer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonList inset={true}>
        {
          user.map((u, index) => {
            const name = u['name'];
            const fullName = `${name['first']} ${name['last']}`
            return (
            <IonItemSliding key={index}>
              <IonItem button={true}>
                <IonIcon color="danger" slot="start" icon={listCircle} size="large"></IonIcon>
                <IonLabel>{fullName}</IonLabel>
              </IonItem>
              
              <IonItemOptions>
                <IonItemOption color="danger" onClick={() => delUser(index)}>Delete</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
            
          )})
        }    
        </IonList>
        </IonContent>
    </IonApp>
  )
}

export default App
