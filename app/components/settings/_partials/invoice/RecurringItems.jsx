import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Field, Part } from '../../../shared/Part';

function RecurringItems({ t, recurringItems, handleRecurringItemsChange }) {
  return [
    <label key="label" className="itemLabel">
      {t('settings:services:name')}
    </label>,
    <Part key="part">
      <Row>
        <Field>
          <label className="itemLabel">{t('settings:fields:enabled')}</label>
          <label className="switch">
            <input
              name="enabled"
              type="checkbox"
              checked={recurringItems.enabled}
              onChange={handleRecurringItemsChange}
            />
            <span className="slider round" />
          </label>
        </Field>
      </Row>
    </Part>,
  ];
}

RecurringItems.propTypes = {
  recurringItems: PropTypes.object.isRequired,
  handleRecurringItemsChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default RecurringItems;
