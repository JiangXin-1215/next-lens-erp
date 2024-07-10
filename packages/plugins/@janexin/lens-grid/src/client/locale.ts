//多语言工具函数
import { useTranslation } from 'react-i18next';

// @ts-ignore
import pkg from './../../package.json';

//usePluginTranslation()：用于获取插件的多语言工具函数
export function usePluginTranslation() {
    //useTranslation()：用于获取多语言工具函数
    return useTranslation([pkg.name, 'client'], { nsMode: 'fallback' });
}

//useCommonTranslation()：用于生成插件的多语言模板
export function generatePluginTranslationTemplate(key: string) {
    return `{{t('${key}', { ns: '${pkg.name}', nsMode: 'fallback' })}}`;
}

//useCommonTranslation()：用于生成通用的多语言模板
export function generateCommonTranslationTemplate(key: string) {
    return `{{t('${key}')}}`;
}