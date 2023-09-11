<template>
  <v-file-input
    :label="label"
    class="file-input"
    v-model="file"
    prepend-icon=""
    single-line
    :clearable="false"
    ref="fileInput"
    @change="onChange"
    :loading="loading"
    :disabled="disabled"
  >
    <template v-slot:append>
      <img
        :src="!file ? uploadIcon : crossIcon"
        alt=""
        @click="onUploadImageClick"
      >
    </template>
  </v-file-input>
</template>

<script>
import { uploadFile, uploadRecordCheckListFile } from '@/api/requests'

import uploadIcon from '@/assets/images/upload.png'
import crossIcon from '@/assets/images/cross.png'

export default {
  name: 'FileInput',
  props: ['label', 'value', 'required', 'userId', 'uploadType', 'disabled'],
  data() {
    return {
      uploadIcon,
      crossIcon,
      file: null,
      loading: false,
    }
  },
  computed: {
    uploadFile: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    onUploadImageClick() {
      if (this.file) {
        this.file = null;
      }
      else {
        this.$refs.fileInput.$el.querySelector('input[type="file"]').click();
      }
    },
    onChange(file) {
      this.$emit('change', file);
      
      if (file) {
        this.loading = true;
        let data = new FormData();
        data.append("image", file, file.name);
        if (!this.uploadType || this.uploadType == 'pq-file') {
          data.append("process_id", this.value.process_id);
          data.append("masterid", this.value.documentmaster_id);
          data.append("code", this.value.DocumentCode);
          data.append("user_id", this.userId);
          data.append("company_id", 1);
          data.append("reference_id", '1');
          uploadFile(data)
            .then(res => {
              window.console.log('upload response', res);
              this.$set(this.value, 'link', res.data.url);
              this.loading = false;
            })
            .catch(e => {
              this.loading = false;
              this.file = null;
              window.console.log(e);
            });
        } else {
          if (this.uploadType == 'pq-record') {
            data.append("PQRecord_id", this.value.PQRecord_id);
          } else {
            data.append("PQChecklistData_id", this.value.PQChecklistData_id);
          }
          uploadRecordCheckListFile(data)
            .then(res => {
              window.console.log('upload response', res);
              this.$set(this.value, 'link', res.data.url);
              this.loading = false;
            })
            .catch(e => {
              this.loading = false;
              this.file = null;
              window.console.log(e);
            });
        }
      }
    }
  },
  watch: {
    'value': {
      handler() {
        this.file = null;
        this.loading = false
      }
    }
  }
}
</script>