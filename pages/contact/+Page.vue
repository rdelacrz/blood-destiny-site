<template>
  <div class="relative md:grid md:gap-20 md:grid-cols-2 md:grid-rows-1 
    before:absolute before:left-[-400px] before:top-[-200px] before:block before:h-[800px] before:w-[800px] before:p-10
    before:bg-gradient-radial before:from-crimson before:from-1% before:to-70% before:opacity-40"
  >
    <div class="relative w-full self-center py-4 md:py-20">
      <h2 class="font-prosto-one text-[2.5rem] uppercase">Contact Form</h2>
      <p class="font-poppins mt-4 mb-10">
        Fill in the form on the right with your preferred name, email address, and message.
        You can select the type of inquiry using the dropdown (general, bug reporting, etc).
        Click the Send button afterwards, and an email will be generated and sent to us regarding
        your inquiry.
      </p>
      <div class="flex items-center">
        <FontAwesomeIcon
          class="border-2 border-crimson rounded-full p-2"
          :icon="faEnvelope"
          size="xl"
          aria-hidden='true' 
        />
        <div class="font-poppins ml-4 break-all">
          {{ contacts.email }}
        </div>
      </div>
    </div>
    <div class="relative w-full self-center py-4 md:py-20">
      <v-form
        :model-value="validated"
        @submit.prevent='handleContactUsSubmit'
      >
        <v-select
          id="inquiry"
          label="Inquiry Type"
          class="my-2"
          :items="inquiryTypes"
          :rules="[rules.required('Inquiry Type')]"
          item-title="text"
          item-value="value"
          variant="outlined"
          :model-value="contactInfo.inquiryType"
        />
        <div class="grid gap-8 grid-cols-2 grid-rows-1">
          <v-text-field
            id="name"
            label="Name"
            class="my-2"
            variant="outlined"
            placeholder="Name"
            :rules="[rules.required('Name')]"
            :model-value="contactInfo.name"
          />
          <v-text-field
            id="email"
            label="Email Address"
            class="my-2"
            variant="outlined"
            :rules="[rules.isEmail]"
            :model-value="contactInfo.email"
          />
        </div>
        <v-textarea
          id="message"
          label="Message"
          class="my-2"
          variant="outlined"
          :rules="[rules.required('Message')]"
          :model-value="contactInfo.message"
        />

        <!-- Server-side rendering causes the button to disappear if AppButton is used in v-form instead -->
        <v-btn 
          id="contactUsBtn" 
          class="mt-4 flex align-middle bg-crimson capitalize text-white font-poppins font-medium 
            rounded-tl-none rounded-tr-[1.125rem] rounded-bl-[1.25rem] rounded-br-none py-[1.375rem] px-6" 
          type="submit"
          color="primary"
          variant="flat"
        >
          Send
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { SubmitEventPromise } from "vuetify/lib/framework.mjs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { ContactInfo, OptionValueSet } from '@/models';
import { useDialogStore } from "@/store";
import { onContactFormSubmit } from './Page.telefunc';

const inquiryTypeStrs = [
  'General Inquiry', 
  'Report A Bug',
];

const { openDialog } = useDialogStore();

const validated = ref(false);
const contactInfo = ref<ContactInfo>({
  inquiryType: inquiryTypeStrs[0],
  name: '',
  email: '',
  message: '',
});

const inquiryTypes = computed(() => inquiryTypeStrs.map(str => ({value: str, text: str})) as OptionValueSet[]);

const contacts = {
  email: 'projectblooddestiny@gmail.com',
};

const handleContactUsSubmit = async (event: SubmitEventPromise) => {
  const result = await event;
  if (result.valid) {
    onContactFormSubmit(contactInfo.value);
    openDialog(
      "Email Sent", 
      `An email has been sent to our team regarding your inquiry. 
      We appreciate all the feedback you can provide us regarding Blood Destiny.`);
  }
}

const rules = {
  required: (fieldName: string) => ((value: string) => !!value || `${fieldName} is required.`),
  isEmail: (value: string) => !value || !!value.match("[^\s@]+@[^\s@]+\.[^\s@]+") || "Valid email address is required (if provided)."
};
</script>
