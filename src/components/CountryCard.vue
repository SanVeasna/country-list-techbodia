<template>
    <div class="bg-white text-black rounded-lg p-4 hover:cursor-pointer" @click="showModal">
        <div class="profile">
            <div class="image">
                <img :src="country.flags.png"/>
            </div>
            <div class="info">
                <div class="text-sm font-poppinBold">{{ country.name.official }}</div>
                <div class="text-sm text-gray-500">{{ nativeName(country.name.nativeName) }}</div>
            </div>
        </div>
        <div class="description">
            <div class="">
                <div class="desc-headline">Country Code</div>
                <div>
                    <div class="code">
                        <div class="dot"></div>
                        <div>2 characters code  :  <b>{{ country.cca2 }}</b></div>
                    </div>
                    <div class="code">
                        <div class="dot"></div>
                        <div>3 characters code  :  <b>{{ country.cca3 }}</b></div>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="desc-headline">Alternative country name</div>
                <template v-for="alt in country.altSpellings">
                    <div class="code">
                        <div class="dot"></div>
                        <div>{{ alt }}</div>
                    </div>
                </template>
            </div>
            <div class="idd">
                <div v-if="country.idd.suffixes && country.idd.suffixes.length > 1" class="text-ellipsis line-clamp-1">
                    {{ renderIdd(country)}}
                </div>
                <span v-else>{{ country.idd.root }}{{ country.idd.suffixes && country.idd.suffixes[0] }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import CountryType from './../CountryType';
import {nativeName} from './../Functions';
import {CountryStore} from './../store/Country';

const store=CountryStore();
const props=defineProps<{
    country: CountryType
}>();
const emit=defineEmits(['showModal']);

const showModal=()=>{
    store.isShowModal=true;
    emit('showModal',props.country);
}

const renderIdd=(country:any)=>{
    var str= country.idd.root;
    country.idd.suffixes.map((id:string,i:number)=>{
        if(i==0) str+='('
        str+=id;
        if(i< country.idd.suffixes.length - 1) str+=',';
        else str+=')'
    })
    return str;
}
</script>

<style scoped>
.profile{
    @apply flex gap-3;
}
.image{
    @apply w-14 h-14 overflow-hidden p-3 bg-borderColor flex-grow-0 flex-shrink-0;
    border-radius: 50%;
}
.image>img{
    @apply w-full h-full object-contain;
}
.description{
@apply text-xs mt-4 flex flex-col gap-3;
}
.code{
    @apply text-gray-600 flex gap-1;
}
.code b{
    @apply font-poppin-medium text-xs text-black;
}
.desc-headline{
    @apply mb-1 font-poppin-medium text-xs;
}
.dot{
    border-radius: 50%;
    @apply w-1 h-1 bg-blue-400 mt-2;
}
.idd{
    @apply font-poppinBold;
}
.info{
    @apply flex flex-col justify-center;
}
</style>