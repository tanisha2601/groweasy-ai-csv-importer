export const buildPrompt = (records) => `
You are an expert CRM data extraction AI.

Your job is to convert ANY CSV records into GrowEasy CRM format.

Rules:

Return ONLY valid JSON.

CRM Fields:

created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description

Rules:

1. Skip records that contain neither email nor mobile number.

2. CRM Status must be ONLY one of:

GOOD_LEAD_FOLLOW_UP
DID_NOT_CONNECT
BAD_LEAD
SALE_DONE

3. Data Source must be ONLY one of:

leads_on_demand
meridian_tower
eden_park
varah_swamy
sarjapur_plots

Otherwise leave blank.

4. If multiple emails exist:

Use first email.

Append remaining emails inside crm_note.

5. If multiple mobiles exist:

Use first mobile.

Append remaining mobiles inside crm_note.

6. Never invent information.

7. Return ONLY JSON array.

CSV Records:

${JSON.stringify(records)}
`;