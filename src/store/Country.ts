import { defineStore } from "pinia";
import {ref} from 'vue';

export const CountryStore=defineStore('country',()=>{
    const isShowModal=ref(false);

    const setModalStatus=(status:boolean)=>{
        isShowModal.value=status;
    }

    return {setModalStatus,isShowModal}
})