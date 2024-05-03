import { useCallback, useEffect, useState } from 'react';
import { unstable_usePrompt, useBlocker, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'libs/redux';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Drawer, Spin } from 'antd';
import { debounce } from 'lodash';

import { addPageMetadata, setData } from 'data/store';
import { usePageMetadata } from 'data/store/page-metadata/use-page-metadata';
import { useQueryGetWorkflowDetail } from 'modules/work-flows/data/queries';
import { ContentDnDFlow } from 'components/common';
import { LeftSidebar, RightSidebar } from 'components/common/react-flows/components';
import { PageHeaderProvider } from 'components/core/page-header-provider';

import { Actions } from './components/actions';

import 'reactflow/dist/style.css';

const WorkflowDetail = () => {
    const [openDraw, setOpenDraw] = useState<any>(false);
    const params = useParams<{ id: string }>();
    const [isDirty, setIsDirty] = useState(false);
    const navigate = useNavigate();

    // const [reactFlowInstanceSelected, setReactFlowInstanceSelected] = useState<any>(null);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const pageMetadata = usePageMetadata(pathname);
    const { data, isFetched } = useQueryGetWorkflowDetail({ select: '*', id: `eq.${Number(params.id)}` });

    unstable_usePrompt({
        message: 'Are you sure?',
        when: ({ currentLocation, nextLocation }) => isDirty && currentLocation.pathname !== nextLocation.pathname
    });

    useEffect(() => {

        const handleBeforeUnload = (event: any) => {

            if (isDirty) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);

    useEffect(() => {
        if (!!data?.data && !!isFetched) {
            if (!!pageMetadata) {
                dispatch(
                    addPageMetadata({
                        pathname,
                        data: {
                            ...pageMetadata,
                            title: data?.data?.name
                        }
                    })
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.data, isFetched, dispatch]);

    const handleSetData = () => {
        setIsDirty(true);
    };

    return (
        <div
            style={{
                height: 'calc(100vh - 64px - 16px)'
            }}
        >
            <PageHeaderProvider
                shouldShowGoBack
                extra={<Actions data={data?.data} onSave={() => setIsDirty(false)} />}
            />
            <div className="flex h-full">
                <LeftSidebar />
                {!!data?.data && <ContentDnDFlow data={data?.data} onChange={handleSetData} />}
            </div>
            <div className="absolute right-0 translate-y-1/2 top-1/2">
                <Button icon={<ArrowLeftOutlined />} title="Preview Json" onClick={() => setOpenDraw(true)} />
            </div>

            <Drawer title="Drawer with extra actions" open={openDraw} onClose={() => setOpenDraw(false)} width={'50vw'}>
                <RightSidebar />
            </Drawer>
        </div>
    );
};

export default WorkflowDetail;
