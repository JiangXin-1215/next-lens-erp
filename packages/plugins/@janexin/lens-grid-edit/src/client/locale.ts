//多语言工具函数
import { useTranslation } from 'react-i18next';

// @ts-ignore
import pkg from '../../package.json';

//usePluginTranslation()：用于获取插件的多语言工具函数
export function usePluginTranslation() {
    return useTranslation([pkg.name, 'client'], { nsMode: 'fallback' });
}


export function generatePluginTranslationTemplate(key: string) {
    return `{{t('${key}', { ns: '${pkg.name}', nsMode: 'fallback' })}}`;
}


export function generateCommonTranslationTemplate(key: string) {
    return `{{t('${key}')}}`;
}