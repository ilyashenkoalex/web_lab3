import Api from '@/api';
import axios from 'axios';

class Doctors extends Api {
  /**
   * Вернет список всех Докторов
   * @returns {Promise<Response>}
   */
  doctors = () => this.rest('/doctors/list.json');

  /**
   * Удалит группу по id
   * @param id
   * @returns {Promise<*>}
   */
  remove = async (id) => {
    const response = await this.rest('/doctors/delete-item', {
      method: 'POST',
      'Content-Type': 'application/json',
      data: { id },
    });
    return id;
  }; // then - заглушка, пока метод ничего не возвращает

  add = async (doctor) => {
    console.log(doctor)
     return await this.rest('/doctors/add-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...doctor},
    });
  };

  // then - заглушка, пока метод ничего не возвращает

  /**
   * Отправит измененную запись
   *
   * @param doctor объект группы, взятый из Formcategory
   * @returns {Promise<*>}
   */
  update = async (doctor) => {
    const response = await this.rest('/doctors/update-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(doctor),
    });
    return response;
  };
}
export default new Doctors();
