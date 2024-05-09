import classNames from 'classnames/bind';
import style from './RestaurantDetail.module.scss';
import { useState, useEffect } from 'react';

import BreadCrumb from '~/components/BreadCrumb/BreadCrumb';
import { EmptyStarIcon, HaftStarIcon, StarIcon } from '~/components/Icons';
import ProductCard from '~/components/ProductCard';

import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantDetail } from '~/apiService/restaurantService';
import NoResult from '~/components/NoResult';

const cx = classNames.bind(style);

function RestaurantDetail() {
  const [activeCategory, setActiveCategory] = useState(null);

  //   const []

  const dispatch = useDispatch();
  const reduxData = useSelector((prop) => prop.restaurant);
  //   console.log(reduxData);

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi component mount
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const handleScroll = () => {
      // Lặp qua từng danh mục
      reduxData.restaurantDetail?.categories.forEach((category) => {
        // Lấy phần tử HTML của danh mục
        const categoryElement = document.getElementById(category._id);

        if (categoryElement) {
          // Lấy vị trí của danh mục đối với cửa sổ
          const categoryPosition = categoryElement.getBoundingClientRect().top;

          // Kiểm tra xem vị trí của danh mục có nằm trong phạm vi hiển thị của cửa sổ không
          const isInView =
            categoryPosition < window.innerHeight / 2 && categoryPosition > -categoryElement.offsetHeight / 2;

          // Nếu danh mục nằm trong phạm vi hiển thị, đặt active category
          if (isInView) {
            setActiveCategory(category._id);
          }
        }
      });
    };

    // Thêm sự kiện cuộn
    window.addEventListener('scroll', handleScroll);

    // Xóa sự kiện khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reduxData.restaurantDetail]); // Kích hoạt khi restaurantDetail thay đổi

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top - 100,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const restaurantId = JSON.parse(sessionStorage.getItem('restaurantIDSelected'));
    dispatch(getRestaurantDetail({ restaurantId: restaurantId })).then((result) => {
      console.log(result);
      if (result.payload.code === 200) {
        setActiveCategory(result.payload.data.shop.categories[0]?._id);
      }
    });
  }, []);

  const rating = reduxData.restaurantDetail?.rating || 0;
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars !== 0;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) stars.push(<StarIcon className={cx('star-icon')} />);
    else if (i === fullStars + 1 && halfStars) stars.push(<HaftStarIcon className={cx('star-icon')} />);
    else stars.push(<EmptyStarIcon className={cx('star-icon')} />);
  }

  return (
    <div className={cx('restaurant')}>
      <div className={cx()}>
        <div className={cx('restaurant-header')}>
          <img
            className={cx('restaurant__bg')}
            src={reduxData.restaurantDetail?.background}
            alt={reduxData.restaurantDetail?.fullname}
          />

          <div className={cx('container')}>
            <BreadCrumb />
            <h1 className={cx('restaurant__name')}>{reduxData.restaurantDetail?.fullname}</h1>
            <p className={cx('restaurant__desc')}>{reduxData.restaurantDetail?.description}</p>

            <div className={cx('restaurant__rating-container')}>
              <div className={cx('restaurant__rating')}>{reduxData.restaurantDetail?.rating}</div>
              <div className={cx('star-container')}>
                {stars.map((star, index) => {
                  return <span key={index}>{star}</span>;
                })}
              </div>
              <div className={cx('restaurant_rating')}>Reviews</div>
            </div>

            <div className={cx('restaurant__time-open')}>
              <div className={cx('restaurant__time-open-label')}>Giờ mở cửa</div>
              <div className={cx('restaurant__time-open-value')}>Từ thứ 2 đến thứ 7 06:00 - 22:00</div>
            </div>
          </div>
        </div>

        <div className={cx('restaurant__nav-container')}>
          <div className={cx('container')}>
            <div className={cx('restaurant__nav')}>
              {reduxData.restaurantDetail?.categories.map((category, index) => {
                return (
                  <div
                    key={category._id}
                    className={cx('restaurant__nav-item', {
                      'restaurant__nav-item-active': category._id === activeCategory,
                    })}
                    onClick={() => {
                      handleCategoryClick(category._id);
                    }}
                  >
                    <div className={cx('restaurant__nav-item-name')}>{category.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {reduxData.restaurantDetail?.categories.length > 0 && (
          <div className={cx('restaurant-body')}>
            <div className={cx('container')}>
              {reduxData.restaurantDetail?.categories.map((category, index) => (
                <div key={index} className={cx('restaurant__group-product-container')} id={category._id}>
                  <div className={cx('restaurant__group-product-name')}>{category.name}</div>

                  <div className={cx('row g-5')}>
                    {category.products.map((product, index) => (
                      <div key={index} className={cx('col-xl-4')}>
                        <ProductCard className={cx('restaurant__product')} data={product} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {reduxData.restaurantDetail?.categories.length <= 0 && !reduxData.loading && <NoResult />}
      </div>
    </div>
  );
}

export default RestaurantDetail;