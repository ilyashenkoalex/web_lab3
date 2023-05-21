import Api from '@/api';
import axios from 'axios';

class Sicks extends Api {
  // list sicks
  sicks = () => this.rest('/sicks/list.json');

  // delete sick for id
    remove = async (id) => {
        const response = await this.rest('/sicks/delete-item', {
            method: 'POST',
            'Content-Type': 'application/json',
            data: { id },
        });
        return id;
    };

  // add new sick in table
    add = async (sick) => {
        console.log("Sick ", sick)
        return await this.rest('/sicks/add-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { ...sick },
        });
    };

  //update sick in table
    update = async (sick) => {
        const response = await this.rest('/sicks/update-item', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(sick),
        });
        return response;
    };
}

export default new Sicks();
