import React from 'react';
import rules from './ruleImage.JPG'

function Rules() {
    
    return (
        <div className="RuleContainor">
            <div className="rule"> <img src={rules} alt="rules" /></div>
        </div>
    );
}

export default Rules;
