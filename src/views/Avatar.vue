<template>
  <div>
    
    <input type="file" @change="selectFile">
    <button @click="submitted"> Submit </button>
    <div> {{uploadImageFile}}</div>
    
  </div>
</template>

<script>
  import { ref, toRefs, watch } from 'vue'
  import { supabase } from '../supabase'
  import {uid} from 'uid'

  export default {
    name: `image`,
    data(){
        return{
            uploadImageFile: null,
            imagePath: ""
            
        }
    },
    methods: {
        selectFile(event){
            this.uploadImageFile = event.target.files[0]
            console.log(this.uploadImageFile)
        },
        async submitted(){
            const imageFile = this.uploadImageFile
            const fileExt = imageFile.name.split('.').pop()
            const generateName = uid()
            const fileName = `${generateName}.${fileExt}`
            this.imagePath = `https://lsckvveawgzilvwkhzbd.supabase.co/storage/v1/object/public/images/${fileName}`
            console.log(this.imagePath)

            const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, imageFile)
        }
    }
    }
  
</script>