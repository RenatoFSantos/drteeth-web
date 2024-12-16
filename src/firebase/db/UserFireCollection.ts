import { db } from '@/firebase/config';
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import ApiQuerys from '@/api/ApiQueyrs';
import UserFire from '@/model/UserFire';
import BaseRepository from '@/interface/BaseRepository';

export default class UserFireCollection implements BaseRepository<UserFire> {
    conversor = {
        toFirestore: function (user: UserFire) {
            return {
                name: user.name,
                age: user.age,
                id: user.id,
            };
        },
        fromFirestore: function (snapshot: any, options: any): UserFire {
            const dados = snapshot?.data(options);
            return new UserFire(dados.name, dados.age, snapshot.id);
        },
    };

    toString(): {} {
        return { name: '', age: '0', id: '' };
    }

    async convCollection() {
        return collection(db, 'users').withConverter(this.conversor);
    }

    async save(user: UserFire): Promise<UserFire> {
        if (user?.id) {
            const docRef = doc(db, 'users', user.id);
            await setDoc(docRef, { name: user.name, age: user.age });
            return user;
        } else {
            const docRef = await addDoc(collection(db, 'users'), {
                name: user.name,
                age: user.age,
            });
        }
    }

    async delete(user: UserFire): Promise<void> {
        console.log('Usuário deletado=', user.name);
        const docRef = doc(db, 'users', user.id);
        return await deleteDoc(docRef);
    }

    async all(): Promise<UserFire[]> {
        ApiQuerys.createToken();
        // fetch('http://localhost:3333/users', {
        //     mode: 'no-cors',
        //     method: "get",
        //     headers: {
        //          "Content-Type": "application/json"
        //     }
        // }).then((res) => {
        //     if(res) {
        //         console.log('Retorno =', res)
        //     }
        // });
        const querySnapshot = await getDocs(collection(db, 'users'));
        const listUser = querySnapshot.docs.map(
            (doc) => new UserFire(doc.get('name'), doc.get('age'), doc.id)
        ) as UserFire[];
        return listUser;
    }
}
