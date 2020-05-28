import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getCategories } from '../../../actions/category';
import CategoryItem from './CategoryItem';
import { Link } from 'react-router-dom';

const Categories = ({ getCategories, category: { categories, loading } }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-warning'>
                <h2 className='card-title '>Categories</h2>
              </div>
              <div className='card-body'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead className=' text-warning'>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Type</th>
                      {/* <th>Active</th> */}
                      <th>Actions</th>
                    </thead>
                    <tbody>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <CategoryItem
                            key={category.id}
                            categoryItem={category}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>No categories found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Link to={'/categoryadd'} className='btn btn-warning my-1'>
                  Add Category
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ category: state.category });

export default connect(mapStateToProps, { getCategories })(Categories);
