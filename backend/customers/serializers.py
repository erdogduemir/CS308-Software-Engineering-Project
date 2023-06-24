from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('pk', 'email', 'name', 'surname', 'tax_id', 'home_address', 'wishList', 'notificationList', 'is_staff', 'is_superuser')