<template>
    <div id="modal_container" v-if="store.isShowModal" class="text-black">
        <div class="modal-content">
            <div class="modal-header">
                <div class="image">
                    <img :src="country.flags.png"/>
                </div>
                <div class="info">
                    <div class="text-sm font-poppinBold text-gray-800">{{ country.name.official }}</div>
                    <div class="text-sm text-gray-500">{{ nativeName(country.name.nativeName) }} <span class="font-poppin-medium text-blue-500">- {{ country.region }}</span></div>
                </div>
            </div>
            <div class="modal-body">
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
                <div class="item-row">
                    <div>
                        <div class="desc-headline">Capital</div>
                        <template v-for="capital in country.capital">
                            <div class="code">
                                <div class="dot"></div>
                                <div>{{ capital }}</div>
                            </div>
                        </template>
                    </div>
                    <div>
                        <div class="desc-headline">Language</div>
                        <template v-for="Language in listLanguages(country.languages)">
                            <div class="code">
                                <div class="dot"></div>
                                <div>{{ Language }}</div>
                            </div>
                        </template>
                    </div>
                    <div>
                        <div class="desc-headline">Population</div>
                        <div class="code">
                            <div class="dot"></div>
                            <div>{{ country.population }}</div>
                        </div>
                    </div>
                </div>
                <div class="item-row">
                    <div>
                        <div class="desc-headline">Time Zone</div>
                        <template v-for="timezone in country.timezones">
                            <div class="code">
                                <div class="dot"></div>
                                <div>{{ timezone }}</div>
                            </div>
                        </template>
                    </div>
                    <div>
                        <div class="desc-headline">Currency</div>
                        <div class="code">
                            <div><span>{{ distructureCurrency(country.currencies).name }}</span><span class="font-poppin-medium text-yellow-500 ml-2">({{ distructureCurrency(country.currencies).symbol }})</span></div>
                        </div>
                    </div>
                </div>
                <div class="item-row">
                    <div class="code">
                         <div class="">Latitude : </div>
                         <div class="font-poppin-medium text-black">{{country&&country.latlng[0] }}</div>
                     </div>
                    <div class="code">
                        <div class="">Longitude : </div>
                        <div class="font-poppin-medium text-black">{{ country && country.latlng[1] }}</div>
                    </div>
                </div>
                <div class="idd">
                    <div v-if="country.idd.suffixes && country.idd.suffixes.length > 1" class="text-ellipsis line-clamp-1">
                        {{ renderIdd(country) }}
                    </div>
                    <span v-else>{{ country.idd.root }}{{ country.idd.suffixes && country.idd.suffixes[0] }}</span>
                </div>
            </div>
            </div>
            <div class="modal-footer">
                <button class="p-3 bg-blue-500 text-xs text-white" @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import CountryType from '../CountryType';
import { nativeName } from '../Functions';
import { CountryStore } from './../store/Country';

const store=CountryStore();

defineProps<{
    country:CountryType
}>();

const closeModal=()=>{
    store.setModalStatus(false);
}

const listLanguages=(languages:any)=>{
    let list=[];
    let keys=languages&&Object.keys(languages);
    for(let key of keys){
        list.push(languages[key])
    };
    return list;
}

const distructureCurrency=(currencies:any)=>{
    const keys=currencies&&Object.keys(currencies);
    var newObj={name:'',symbol:''};
    for(let key of keys){
        newObj=currencies[key];
    }
    return newObj;
}

const renderIdd = (country: any) => {
    var str = country.idd.root;
    country.idd.suffixes.map((id: string, i: number) => {
        if (i == 0) str += '('
        str += id;
        if (i < country.idd.suffixes.length - 1) str += ',';
        else str += ')'
    })
    return str;
}

</script>

<style scoped>
#modal_container{
    transform: translate(-50%,-50%);
    position: absolute;
    top: 50%;
    left: 50%;
    --tw-bg-opacity: 1;
    background-color: white;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 10px 1px #0000002b;
    border-radius: 7px;
    padding: 16px;
    width: 500px;
}

.modal-header{
    @apply flex gap-3 border-b border-gray-400 pb-4;
}
.image{
    @apply w-14 h-14 overflow-hidden p-3 bg-borderColor flex-grow-0 flex-shrink-0;
    border-radius: 50%;
}
.image>img{
    @apply w-full h-full object-contain;
}

.dot{
    border-radius: 50%;
    @apply w-1 h-1 bg-blue-400 mt-2;
}

.description{
@apply text-xs flex flex-col gap-4 pt-4 pb-4;
}
.code{
    @apply text-gray-600 flex gap-1;
}
.code b{
    @apply font-poppin-medium text-xs text-black;
}
.desc-headline{
    @apply mb-1 font-poppin-medium text-xs text-black;
}
.idd{
    @apply font-poppinBold text-black;
}
.info{
    @apply flex flex-col justify-center;
}
.item-row{
    @apply grid grid-cols-3 gap-6;
}

.modal-body {
    max-height: calc(100vh - 270px);
    overflow: hidden auto;
}

@media only screen and (max-width:640px){
    #modal_container{
        width: 420px;
    }
    .item-row{
        @apply grid-cols-2;
    }
}

@media only screen and (max-width:460px){
    #modal_container{
        width: 320px;
    }
}
</style>