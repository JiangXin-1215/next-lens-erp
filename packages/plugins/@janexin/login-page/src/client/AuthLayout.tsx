import React from 'react';
import { Outlet } from 'react-router-dom';
import { PoweredBy, css, useSystemSettings } from '@nocobase/client';
import { AuthenticatorsContextProvider } from '@nocobase/plugin-auth/client'

import authImg from './auth-image.webp';

export function CustomAuthLayout() {
    const { data } = useSystemSettings();

    //图片作为背景 输入框居中
    return <div style={{
        backgroundImage: `url(${authImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <div
            style={{
                maxWidth: 320,
                margin: '0 auto',
            }}
        >
            <h1 style={{ color: 'white', fontSize: '24px' }}>{data?.data?.title}</h1>
            <AuthenticatorsContextProvider>
                <Outlet />
            </AuthenticatorsContextProvider>
            <div
                className={css`
          position: absolute;
          bottom: 24px;
          width: 100%;
          left: 0;
          text-align: center;
        `}
            >
                <PoweredBy />
            </div>
        </div>
    </div>
    // return <Row style={{ height: '100%' }}>
    //     <Col xs={{ span: 0 }} md={{ span: 12 }}>
    //         <img src={authImg} style={{
    //             objectFit: 'cover',
    //             objectPosition: 'center',
    //             width: '100%',
    //             height: '100%',
    //             maxWidth: '100%',
    //             display: 'block',
    //             verticalAlign: 'middle'
    //         }} />
    //     </Col>
    //     <Col xs={{ span: 24 }} md={{ span: 12 }}>
    //         <div
    //             style={{
    //                 maxWidth: 320,
    //                 margin: '0 auto',
    //                 paddingTop: '20vh',
    //             }}
    //         >
    //             <h1>{data?.data?.title}</h1>
    //             <AuthenticatorsContextProvider>
    //                 <Outlet />
    //             </AuthenticatorsContextProvider>
    //             <div
    //                 className={css`
    //       position: absolute;
    //       bottom: 24px;
    //       width: 100%;
    //       left: 0;
    //       text-align: center;
    //     `}
    //             >
    //                 <PoweredBy />
    //             </div>
    //         </div>
    //     </Col>
    // </Row>
}