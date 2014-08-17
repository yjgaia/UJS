TEST 'FORM', (ok) ->

  form = undefined
  input = undefined

  div = DIV(
    style:
      position: 'fixed'
      left: 40
      top: 40
      backgroundColor: 'red'
      padding: 20
      margin: 0
  , ->
    form = FORM ->
      DIV ->
        H5 ->
          'Name'
        input = INPUT name: 'name'
      DIV
        style:
          marginTop: 10
      , ->
        H5 ->
          'Gender'
        SELECT
          name: 'gender'
        , ->
          OPTION
            value: 'male'
          , ->
            'Male'
          OPTION
            value: 'female'
          , ->
            'Female'
      DIV
        style:
          marginTop: 10
      , ->
        H5 ->
          'Age'
        INPUT name: 'age'
      DIV
        style:
          marginTop: 10
      , ->
        H5 ->
          'Profile'
        TEXTAREA name: 'profile'
  ).appendTo BODY

  form.setData
    name: 'SYJ'
    gender: 'male'
    age: 26
    profile: 'Young man.'

  ok CHECK_ARE_SAME([
    form.getData()
    {
      name: 'SYJ'
      gender: 'male'
      age: '26'
      profile: 'Young man.'
    }
  ]) is true

  ok input.getValue() is 'SYJ'
  
  # remove div after 3 seconds.
  DELAY 3, ->
    div.remove()
