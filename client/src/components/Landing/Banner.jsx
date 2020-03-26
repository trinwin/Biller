import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';
import BannerImage from './BannerImage';

class Banner extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };
  static defaultProps = {
    className: 'home-banner',
  };
  render() {
    const { className } = this.props;
    return (
      <div className={`home-layout-wrapper ${className}`}>
        <div className="home-layout">
          <QueueAnim
            className={`${className}-content-wrapper`}
            delay={300}
            ease="easeOutQuart"
          >
            <h1 key="h2">Biller</h1>
            <p key="p">
              Your Personal Bill Assistant. <br />
              Join us for free today and never worry about your bill again
            </p>
            <span key="button">
              <Link to="/register">
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => {
                    window.location.href = '/signup';
                  }}
                >
                  Sign up
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  Login
                </Button>
              </Link>
            </span>
          </QueueAnim>
          <div className={`${className}-image-wrapper`}>
            <BannerImage />
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
