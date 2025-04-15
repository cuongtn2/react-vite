import { getUsersAPI } from '@/services/api';
import { dateRangeValidate, FORMATE_DATE } from '@/services/help';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Descriptions, Divider, Drawer } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import DetailUser from './detail.user';
type TSearch = {
    fullName: string;
    email: string;
    createdAt: string;
    createdAtRange: string,
}



const TableUser = () => {
    const actionRef = useRef<ActionType>();
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    })
    const [openViewDetail, setOpenViewDetail] = useState(false)
    const [dataViewDetail, setDataViewDetail] = useState<IUserTable | null>(null)
    const showDrawerViewDetail = () => {
        setOpenViewDetail(true);
    };

    const columns: ProColumns<IUserTable>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Id',
            dataIndex: '_id',
            hideInSearch: true,
            render: (_, record) => (
                <a href='#' onClick={() => {
                    setDataViewDetail(record)
                    showDrawerViewDetail()
                }}>
                    {record._id}
                </a>
            ),
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            copyable: true,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            valueType: 'date',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            hideInTable: true,
        },
        // {
        //     title: 'Title',
        //     dataIndex: 'title',
        //     copyable: true,
        //     ellipsis: true,
        //     tooltip: '标题过长会自动收缩',
        //     formItemProps: {
        //         rules: [
        //             {
        //                 required: true,
        //                 message: '此项为必填项',
        //             },
        //         ],
        //     },
        // },
        {
            title: 'Action',
            hideInSearch: true,
            render: (_, row, index, action) => [

                <a
                    key="a"
                    onClick={() => {
                        action?.startEditable(row._id);
                    }}
                >
                    <EditTwoTone twoToneColor="#f57800" style={{ cursor: "pointer", marginRight: 15 }} />
                </a>,
                <a
                    key="a"
                    onClick={() => {
                        action?.startEditable(row._id);
                    }}
                >
                    <DeleteTwoTone twoToneColor="#ff4d4f" style={{ cursor: "pointer" }} />
                </a>,
            ],
        },
    ];

    return (
        <>
            {/* truyền TSearch xún để gắn thêm type cho params của request table */}
            <ProTable<IUserTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered

                request={async (params, sort, filter) => {
                    console.log(params, sort, filter)
                    let query = "";
                    if (params) {
                        query += `current=${params.current}&pageSize=${params.pageSize}`
                    }
                    if (params.email) {
                        query += `&email=/${params.email}/i`
                    }
                    if (params.fullName) {
                        query += `&fullName=/${params.fullName}/i`
                    }
                    const createDateRange = dateRangeValidate(params.createdAtRange)
                    if (createDateRange) {
                        query += `&createdAt>=/${createDateRange[0]}&createdAt<=${createDateRange[1]}`
                    }
                    if (sort && sort.createdAt) {
                        query += `&sort=${sort.createdAt === 'ascend' ? "createdAt" : "-createdAt"}`
                    }


                    const res = await getUsersAPI(query)
                    console.log('res', res.data?.result)
                    if (res.data) {
                        setMeta(res?.data?.meta)
                    }
                    return {
                        data: res.data?.result,
                        // data: [],
                        "page": 1,
                        "success": true,
                        "total": res.data?.meta.total
                    }

                }}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    showSizeChanger: true,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page) => console.log(page),
                }}
                headerTitle="Table user"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            actionRef.current?.reload();
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>

                ]}
            />
            <DetailUser dataViewDetail={dataViewDetail} openViewDetail={openViewDetail} setDataViewDetail={setDataViewDetail} setOpenViewDetail={setOpenViewDetail} />
        </>
    );
};

export default TableUser;