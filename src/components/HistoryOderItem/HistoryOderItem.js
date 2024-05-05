import classNames from 'classnames/bind';
import style from './HistoryOderItem.module.scss';
import images from '~/assets/images';
import { StoreIcon } from '../Icons';
import Button from '../Button';

const cx = classNames.bind(style);

const listSubItem = [
  {
    name: 'Áo khoác gió lót lông nam nữ mùa đông AVANCO cao cấp, form rộng unisex mũ liền, chống nước và giữ ấm hiệu quả - AVGL',
    categories: 'cơm-bún-chả',
    price: '20000',
    quantity: 1,
    img: images.developer1,
  },
  {
    name: 'Áo khoác gió lót lông nam nữ mùa đông AVANCO cao cấp, form rộng unisex mũ liền, chống nước và giữ ấm hiệu quả - AVGL',
    categories: 'cơm-bún-chả',
    price: '20000',
    quantity: 1,
    img: images.developer1,
  },
  {
    name: 'Áo khoác gió lót lông nam nữ mùa đông AVANCO cao cấp, form rộng unisex mũ liền, chống nước và giữ ấm hiệu quả - AVGL',
    categories: 'cơm-bún-chả',
    price: '20000',
    quantity: 1,
    img: images.developer1,
  },
];

function HistoryOderItem() {
  return (
    <div className={cx('item-wrapper')}>
      <div className={cx('item__shop-info')}>
        <div className={cx('item__shop-name')}>
          <div>
            <StoreIcon />
          </div>
          <div> Le nghia </div>
        </div>
        <div className={cx('item__status')}>Hoàn thành</div>
      </div>

      {listSubItem.map((subItem, index) => {
        return (
          <div className={cx('sub-item__info-container')}>
            <img className={cx('sub-item__img')} src={subItem.img} alt="haui food" />
            <div className={cx('sub-item__info')}>
              <div className={cx('sub-item__name')}>{subItem.name}</div>
              <div className={cx('sub-item__quantity')}>X{subItem.quantity}</div>
              <div className={cx('sub-item__categories')}>{subItem.categories}</div>
            </div>
            <div className={cx('sub-item__price')}>{subItem.price}</div>
          </div>
        );
      })}

      <div className={cx('total__container')}>
        <div className={cx('total__content')}>
          <div className={cx('total__label')}>Thành tiền</div>
          <div className={cx('total__value')}>100000</div>
        </div>
        <Button className={cx('re-buy-btn')} primary>
          Mua lai
        </Button>
      </div>
    </div>
  );
}

export default HistoryOderItem;
