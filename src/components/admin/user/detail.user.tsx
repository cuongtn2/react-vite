import { FORMATE_DATE } from '@/services/help';
import { Badge, Descriptions, Drawer } from 'antd';
import dayjs from 'dayjs';

interface IProps {
  openViewDetail: boolean;
  setOpenViewDetail: (v: boolean) => void;
  dataViewDetail: IUserTable | null;
  setDataViewDetail: (v: IUserTable | null) => void;

}
export default function DetailUser(props: IProps) {
  const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
  const onClose = () => {
    setOpenViewDetail(false)
    setDataViewDetail(null)
  }
  return (
    <Drawer title="Chức năng xem chi tiết" width={"50vw"} onClose={onClose} open={openViewDetail}>
      <Descriptions bordered title="User Info" column={2} >
        <Descriptions.Item label="Id">{dataViewDetail?._id}</Descriptions.Item>
        <Descriptions.Item label="Full Name">{dataViewDetail?.fullName}</Descriptions.Item>
        <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{dataViewDetail?.phone}</Descriptions.Item>
        <Descriptions.Item label="Role" span={2}>
          <Badge status='processing' text={dataViewDetail?.role} />

        </Descriptions.Item>
        <Descriptions.Item label="Created At">{dayjs(dataViewDetail?.createdAt).format(FORMATE_DATE)}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{dayjs(dataViewDetail?.updatedAt).format(FORMATE_DATE)}</Descriptions.Item>
      </Descriptions>
    </Drawer>
  )
}
