TEST('FORM', function(ok) {
  var div, form, input;
  form = void 0;
  input = void 0;
  div = DIV({
    style: {
      position: 'fixed',
      left: 40,
      top: 40,
      backgroundColor: 'red',
      padding: 20,
      margin: 0
    }
  }, function() {
    return form = FORM(function() {
      DIV(function() {
        H5(function() {
          return 'Name';
        });
        return input = INPUT({
          name: 'name'
        });
      });
      DIV({
        style: {
          marginTop: 10
        }
      }, function() {
        H5(function() {
          return 'Gender';
        });
        return SELECT({
          name: 'gender'
        }, function() {
          OPTION({
            value: 'male'
          }, function() {
            return 'Male';
          });
          return OPTION({
            value: 'female'
          }, function() {
            return 'Female';
          });
        });
      });
      DIV({
        style: {
          marginTop: 10
        }
      }, function() {
        H5(function() {
          return 'Age';
        });
        return INPUT({
          name: 'age'
        });
      });
      return DIV({
        style: {
          marginTop: 10
        }
      }, function() {
        H5(function() {
          return 'Profile';
        });
        return TEXTAREA({
          name: 'profile'
        });
      });
    });
  }).appendTo(BODY);
  form.setData({
    name: 'SYJ',
    gender: 'male',
    age: 26,
    profile: 'Young man.'
  });
  ok(CHECK_ARE_SAME([
    form.getData(), {
      name: 'SYJ',
      gender: 'male',
      age: '26',
      profile: 'Young man.'
    }
  ]) === true);
  ok(input.getValue() === 'SYJ');
  return DELAY(3, function() {
    return div.remove();
  });
});
