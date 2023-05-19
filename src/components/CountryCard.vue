<template>
    <div class="bg-white text-black rounded-lg p-4">
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
                <span v-if="country.idd.suffixes&&country.idd.suffixes.length>1" class="text-ellipsis line-clamp-1">
                    {{ country.idd.root }}(
                    <template v-for="id,key in country.idd.suffixes">
                        {{ id }}<span v-if="key< (country.idd.suffixes && country.idd.suffixes.length-1)">,</span>
                    </template>)
                </span>
                <span v-else>{{ country.idd.root }}{{ country.idd.suffixes&&country.idd.suffixes[0] }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import CountryType from './../CountryType';
defineProps<{
    country: CountryType
}>()

const nativeName=(objName:any)=>{
if(!objName) return;
let keys=Object.keys(objName);
return objName[keys[0]].official??'';
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