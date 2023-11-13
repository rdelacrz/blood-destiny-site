<template>
  <div class='contact-wrapper container'>
    <div class='title-container'>
      <div class='title' :style="{'background-image': titleBackground}">Contact Us</div>
    </div>
    <div class='contact-content-wrapper'>
      <form class='contact-form-wrapper' @submit.prevent='handleContactUsSubmit'>
        <Select id='inquiry' inputClass='form-input' v-model:value='contactInfo.inquiryType' :options='inquiryTypes' required />
        <TextInput id='name' inputClass='form-input' v-model:value='contactInfo.name' placeholder='NAME' required />
        <TextInput id='email' inputClass='form-input' v-model:value='contactInfo.email' placeholder='EMAIL' type='email' required />
        <TextArea id='message' inputClass='form-input' v-model:value='contactInfo.message' placeholder='MESSAGE' required />
        <AppButton id='contactUsBtn' type='submit' :background-src="contactUsBtnBackground">Contact Us</AppButton>
      </form>
      <div class='contact-addresses-wrapper'>
        <div class='contact-info-container'>
          <img :src='mailIcon' alt='E-mail Icon' />
          <a class='contact-link' :href="`mailto:${contacts.email}`">{{contacts.email}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, defineAsyncComponent } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { ContactInfo, OptionValueSet } from '@/models';
import { ContactsModuleState, ContactsModuleGetters, ContactsModuleActions, ContactsModuleMutations } from '@/store/modules';

import buttonContactUs from '@/assets/images/backgrounds/buttons/button_contact_us.png';
import bloodGraphic from '@/assets/images/graphics/blood_center.png';
import mailIcon from '@/assets/images/icons/icon_mail.png';

export default defineComponent({
  name: 'contact',
  components: {
    TextInput: defineAsyncComponent(() => import('@/components/form-elements/TextInput.vue')),
    TextArea: defineAsyncComponent(() => import('@/components/form-elements/TextArea.vue')),
    Select: defineAsyncComponent(() => import('@/components/form-elements/Select.vue')),
    AppButton: defineAsyncComponent(() => import('@/components/clickable-elements/AppButton.vue')),
  },
  setup() {
    const { useActions } = createNamespacedHelpers<
      ContactsModuleState, 
      ContactsModuleGetters, 
      ContactsModuleActions, 
      ContactsModuleMutations
    >('ContactModule');
    const { sendContactEmail } = useActions(['sendContactEmail']);
    return {
      sendContactEmail,
    };
  },
  data() {
    const inquiryTypeStrs = [
      'General Inquiry', 
      'Report A Bug',
    ];
    const contactInfo: ContactInfo = {
      inquiryType: inquiryTypeStrs[0],
      name: '',
      email: '',
      message: '',
    };
    const inquiryTypes: OptionValueSet[] = inquiryTypeStrs.map(str => ({value: str, text: str}));

    return {
      pageTitle: 'Blood Destiny - Contact',
      titleBackground: `url(${bloodGraphic})`,
      contactUsBtnBackground: buttonContactUs,
      mailIcon,
      contactInfo,
      inquiryTypes,
      contacts: {
        email: 'projectblooddestiny@gmail.com',
      },
    }
  },
  methods: {
    handleContactUsSubmit() {
      this.sendContactEmail(this.contactInfo);
    },
  },
});
</script>

<style lang='scss' scoped>
.contact-wrapper {
  .title-container {
    position: relative;
    display: flex;
    justify-content: center;
    .title {
      position: absolute;
      top: -120px;
      background-repeat: no-repeat;
      color: white;
      text-align: center;
      font-family: 'Broadway';
      font-size: 36px;
      height: 415px;
      width: 347px;
      padding-top: 180px;
      text-transform: uppercase;
    }
  }
  .contact-content-wrapper {
    position: relative;
    margin-top: 200px;
    .contact-form-wrapper {
      display: inline-block;
      max-width: 400px;
      width: 100%;
      .form-input {
        margin-bottom: 15px;
      }
    }
    .contact-addresses-wrapper {
      display: inline-block;
      padding-left: 72px;
      vertical-align: top;
      .contact-info-container {
        display: flex;
        align-items: center;
        .contact-link {
          color: white;
          font-family: 'Montserrat';
          font-size: 18px;
          margin-left: 20px;
          text-decoration: none;
          &:hover, &:focus {
            text-decoration: underline;
            outline: none;
          }
        }
        + .contact-info-container {
          margin-top: 27px;
        }
      }
    }
  }
}
</style>

<!-- Padding on this layer will not work otherwise -->
<style lang='scss'>
.contact-wrapper {
  padding: 0 150px;
  #contactUsBtn {
    min-width: 154px;
    padding: 8px;
  }
}
</style>