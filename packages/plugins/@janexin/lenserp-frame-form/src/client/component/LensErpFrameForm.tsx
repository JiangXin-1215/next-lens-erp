import React, { FC } from 'react';
import { withDynamicSchemaProps } from '@nocobase/client';
import { BlockName } from '../constants';
import { Form, FormProps } from '@formily/antd-v5';

export interface LensERPFrameFormProps extends FormProps {
    children?: React.ReactNode;
}

export const LensERPFrameForm: FC<LensERPFrameFormProps> = withDynamicSchemaProps((props) => {
    return <Form {...props} layout={props.layout || 'vertical'} />
}, { displayName: BlockName });