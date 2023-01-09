import { ActionContext, Module } from 'vuex';
import { AlertParam, ContactInfo } from '@/models';
import { contactService } from '@/store/services';
import RootState from '@/store/state';

export type ContactsModuleState = {
}

export type ContactsModuleGetters = {
}

export type ContactsModuleMutations = {
}

export type ContactsModuleActions = {
  sendContactEmail: (context: ActionContext<ContactsModuleState, RootState>, contactInfo: ContactInfo) => void;
}

const state: ContactsModuleState = { }

const getters: ContactsModuleGetters = { }

const mutations: ContactsModuleMutations = { }

const actions: ContactsModuleActions = {
  sendContactEmail: (context, contactInfo: ContactInfo) => {
    const alertParam: AlertParam = {
      isActive: true,
      title: 'Message Sent',
      message: 'Your message has successfully sent to the Devious Arc team.',
      type: 'success',
    };
    context.commit('setPopupState', alertParam, {root: true});

    contactService.sendContactEmail(contactInfo)
      .then(resp => {
        // Revises the alert message if an error occurs
        if (!resp) {
          alertParam.title = 'Message Error';
          alertParam.message = 'Something wrong happened while attempting to send the message to the Devious Arc team.';
          alertParam.type = 'error';
        }

        context.commit('setPopupState', alertParam, {root: true});
      })
      .catch(err => {
        // Handle alert messages
        context.commit('setPopupState', alertParam, {root: true});
      });
  }
}

export const ContactModule: Module<ContactsModuleState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}