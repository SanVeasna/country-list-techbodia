<template>
    <div>
        <div class="mb-6 flex pt-6 ml-4 mr-4 justify-between items-center gap-10 flex-wrap">
            <h1 class="relative w-fit page-title font-poppinBold text-2xl whitespace-nowrap">Country List</h1>
            <input v-model="searchStr" class="search-box" placeholder="search..."/>
        </div>
        <div class="page-container">
            <div v-if="!isLoading">
                <div id="items" v-if="countryList && countryList?.length > 0">
                    <template v-for="country in countryList">
                        <CountryCard :country="country"/>
                    </template>
                </div>
                <div v-else class="text-content">No Country Found!</div>
            </div>
            <div v-else class="text-content">Loading...</div>
        </div>
        <div class="footer-section">
            <div class="total-record">Total : {{ searchStr==''?oldList?.length: newList?.length }}</div>
            <div class="pagination flex items-center gap-2">
                <div class="flex items-center mr-6 gap-3">
                    <img class="w-4 h-4 cursor-pointer" @click="sortList('DESC',countryList)" src="./../assets/images/arrow-down-line.svg"/>
                    <img class="w-4 h4 cursor-pointer" @click="sortList('ASC', countryList)" src="./../assets/images/arrow-up-line.svg"/>
                </div>
                <div class="change-page relative flex items-center gap-1">Page {{ page }} <img @click="isShow=!isShow" class="w-5 h-5 cursor-pointer" src="./../assets/images/down1.png"/>
                    <ul v-if="isShow">
                        <li v-for="i in totalPage" :value="i" @click='setPage(i)'>{{ i }}</li>
                    </ul>
                </div>
                <div> of {{totalPage}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import CountryType from '../CountryType';
import CountryCard from './CountryCard.vue';
import {search,pagination,sortCountry} from './../Functions';
const countryList=ref<[CountryType]>();
const searchStr=ref('');
const oldList= ref<[CountryType]>();
const newList=ref<[CountryType]>();
const isLoading=ref<boolean>(true);
const isShow=ref(false);
const page=ref(1);
const sortDesc=ref('DESC');
var totalPage=0;

onMounted(()=>{
    axios.get('https://restcountries.com/v3.1/all').then((response:any)=>{
        oldList.value=response.data;
        isLoading.value=false;
        countryList.value= pagination(1, 25, oldList.value) ?? [];
        sortList(sortDesc.value,countryList.value);
        totalPage= (oldList.value && Math.ceil(oldList.value?.length / 25 > 1 ? oldList.value?.length / 25 : 1))??0;
    })
})

watch(searchStr,(newSearch:string)=>{
    newList.value=search(newSearch,oldList.value)??[];
    countryList.value=pagination(1,25,newList.value);
    sortList(sortDesc.value,countryList.value);
    if(searchStr.value!='')page.value=1;
    totalPage = (newList.value && Math.ceil(newList.value?.length / 25>1? newList.value?.length / 25:1)) ?? 0;
})

const setPage=(p:number)=>{
    page.value=p;
    isShow.value=false;
    let lists=pagination(page.value,25,searchStr.value==''?oldList.value:newList.value)??[];
    sortList(sortDesc.value,lists);
    countryList.value=lists;
}

const sortList=(target:string,list:any)=>{
    sortDesc.value=target;
    sortCountry(sortDesc.value,list);
}
</script>

<style scoped>
.page-title::before{
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    background: #1E88E5;
    left: 50%;
    top: 40px;
    transform: translate(-50%, -50%);
    border-radius: 25px;
}
.page-container{
    @apply overflow-y-auto overflow-x-hidden p-4
}
#items{
    @apply grid grid-cols-1 gap-4;
    max-height: calc(100vh - 185px);
}
#items{
    @apply md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
}
.text-content{
    @apply text-md font-poppin-medium text-gray-200 text-center w-full h-52 flex items-center justify-center;
}
.footer-section{
    @apply flex justify-between items-center mt-4 mb-4 ml-4 mr-4;
}
ul{
    @apply absolute bottom-8 bg-black pt-2 pb-2 left-4 rounded-md;
}
ul>li{
    @apply h-8 flex items-center justify-center;
    padding: 2px 16px;
    transition: all .3s;
}
ul>li:hover{
    cursor: pointer;
    background: rgba(255, 255, 255, 0.232);
}
.search-box{
    @apply border border-gray-300 rounded-md text-sm p-3;
}
@media only screen and (max-width:460px){
    .search-box{
        @apply w-full;
    }
}
</style>