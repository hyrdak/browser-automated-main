import { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { PageHeaderDOMId } from 'constants-es';
import { useAppDispatch } from 'libs/redux';

import { addPageMetadata } from 'data/store';
import { usePageMetadata } from 'data/store/page-metadata/use-page-metadata';

export interface PageHeaderProviderProps {
    title?: string;
    description?: string;
    headerTitle?: string;
    headerSubTitle?: string;
    extra?: React.ReactNode;
    footer?: React.ReactNode;
    tag?: React.ReactNode;
    shouldShowGoBack?: boolean;
    isShowBreadcrumb?: boolean;
    children?: React.ReactNode;
}

export const PageHeaderProvider = memo(function PageHeaderProvider({
    children,
    extra,
    footer,
    isShowBreadcrumb,
    shouldShowGoBack,
    tag,
    ...props
}: PageHeaderProviderProps): JSX.Element {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const pageMetadata = usePageMetadata(pathname);
    const [domNode, setDomNode] = useState<{
        pageHeaderDescription: HTMLElement | null;
        pageHeaderExtra: HTMLElement | null;
        pageHeaderFooter: HTMLElement | null;
        pageHeaderTag: HTMLElement | null;
    }>({
        pageHeaderDescription: null,
        pageHeaderExtra: null,
        pageHeaderFooter: null,
        pageHeaderTag: null
    });

    useEffect(() => {
        dispatch(
            addPageMetadata({
                pathname,
                data: {
                    shouldShowGoBack,
                    hasHeaderDescription: !!children,
                    hasExtra: !!extra,
                    hasTag: !!tag,
                    hasFooter: !!footer,
                    isShowBreadcrumb,
                    ...props
                }
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    useEffect(() => {
        setDomNode({
            pageHeaderDescription: document.getElementById(PageHeaderDOMId.Description),
            pageHeaderExtra: document.getElementById(PageHeaderDOMId.Extra),
            pageHeaderFooter: document.getElementById(PageHeaderDOMId.Footer),
            pageHeaderTag: document.getElementById(PageHeaderDOMId.Tag)
        });
    }, [pageMetadata]);

    return (
        <>
            {domNode.pageHeaderDescription && createPortal(children, domNode.pageHeaderDescription)}
            {domNode.pageHeaderExtra && createPortal(extra, domNode.pageHeaderExtra)}
            {domNode.pageHeaderFooter && createPortal(footer, domNode.pageHeaderFooter)}
            {domNode.pageHeaderTag && createPortal(tag, domNode.pageHeaderTag)}
        </>
    );
});
