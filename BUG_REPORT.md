### Bug 1: DELETE endpoint returns 204 instead of 200

Expected:
Some systems may expect 200 OK

Actual:
Returns 204 No Content

Conclusion:
204 is valid REST behavior. No fix required.


### Bug 2: Limited validation for query params

Expected:
Invalid status values should be validated

Actual:
No strict validation for status query

Impact:
May lead to inconsistent filtering behavior or unexpected results.

Suggested Fix:
Validate the status query parameter against allowed values 
(todo, in_progress, done) before processing the request.