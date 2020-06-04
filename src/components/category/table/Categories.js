import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getCategories, deleteCategory } from '../../../actions/category';
import { Link, useHistory } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact';

const Categories = ({
  getCategories,
  deleteCategory,
  category: { categories, loading },
}) => {
  const [datatable, setDatatable] = useState({});
  let history = useHistory();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (!loading && categories) {
      const rows = categories.map((category) => {
        const {
          id,
          Setting: { setname },
        } = category;
        if (!category.hasOwnProperty('setname')) {
          Object.defineProperty(category, 'setname', {
            value: setname,
          });
        } else {
          Object.assign(category, 'setname', {
            value: setname,
          });
        }

        if (!category.hasOwnProperty('action')) {
          return Object.defineProperty(category, 'action', {
            value: (
              <Fragment>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={(e) => confirmDelete(id, e)}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={(e) => handleEditClick(id, e)}
                >
                  Edit
                </button>
              </Fragment>
            ),
          });
        } else {
          return Object.assign(category, 'action', {
            value: (
              <Fragment>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={(e) => confirmDelete(id, e)}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={(e) => handleEditClick(id, e)}
                >
                  Edit
                </button>
              </Fragment>
            ),
          });
        }
      });
      setDatatable({
        columns: [
          {
            label: 'Id',
            field: 'id',
            sort: 'asc',
          },
          {
            label: 'Name',
            field: 'name',
          },
          {
            label: 'Type',
          },
          {
            label: 'Actions',
            field: 'action',
          },
        ],
        rows: rows,
      });
    }
  }, [categories]);

  function confirmDelete(id, e) {
    e.preventDefault();
    if (window.confirm('Are you sure to delete category?')) {
      deleteCategory(id);
    } else {
      return;
    }
  }

  function handleEditClick(id, e) {
    e.preventDefault();
    history.push(`/categoryedit/${id}`);
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-tenpearls'>
                <h3 className='card-title '>Categories</h3>
              </div>
              <div className='card-body'>
                <MDBDataTableV5
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={datatable}
                />
                <Link to={'/categoryadd'} className='btn btn-tenpearls my-1'>
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
  deleteCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ category: state.category });

export default connect(mapStateToProps, { getCategories, deleteCategory })(
  Categories
);
