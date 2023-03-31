import React, { useState } from 'react';

const LocationPermissionCheckbox = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [countryCode, setCountryCode] = useState('');

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        if (!e.target.checked) {
            setCountryCode('');
            props.onCountryCodeChange('');
        }
    };

    const getCountryCode = () => {
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                setCountryCode(data.country);
                props.onCountryCodeChange(data.country);
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                Allow access to my location. This is only to filter which streaming
                services have the movie in your country.

            </label>
            <br/>
            {isChecked && (
                <button onClick={getCountryCode}>Get My Country Code</button>
            )}
        </div>
    );
};

export default LocationPermissionCheckbox;