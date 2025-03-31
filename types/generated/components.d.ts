import type { Attribute, Schema } from '@strapi/strapi';

export interface SharePartner extends Schema.Component {
  collectionName: 'components_share_partners';
  info: {
    displayName: 'partner';
    icon: 'alien';
  };
  attributes: {
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Attribute.String;
  };
}

export interface ShareSeo extends Schema.Component {
  collectionName: 'components_share_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'alien';
  };
  attributes: {
    description: Attribute.Text;
    keyword: Attribute.Text;
    thumbnail: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'share.partner': SharePartner;
      'share.seo': ShareSeo;
    }
  }
}
