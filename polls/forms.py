from django import forms

class NumForm(forms.Form):
    num = forms.IntegerField(label='number1')