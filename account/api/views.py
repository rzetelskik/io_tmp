from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from knox.models import AuthToken

from .serializers import CustomUserSerializer, RegisterSerializer, LoginSerializer, PasswordUpdateSerializer, DetailsUpdateSerializer
from account.models import CustomUser

@api_view(['POST',])
def registerView(request):
    serializer = RegisterSerializer(data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = AuthToken.objects.create(user)[1] # getting the actual token, not an object
    response_data['response'] = 'Successfully created a new user.'
    response_data['username'] = user.username
    response_data['token'] = token
    
    return Response(response_data)


@api_view(['POST', ])
def loginView(request):
    serializer = LoginSerializer(data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    token = AuthToken.objects.create(user)[1]  # getting the actual token, not an object
    response_data['response'] = 'Successfully logged in.'
    response_data['username'] = user.username
    response_data['token'] = token
    
    return Response(response_data)
        

class CustomUserDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


@api_view(['PUT',])
@permission_classes([permissions.IsAuthenticated])
def passwordUpdateView(request):
    serializer = PasswordUpdateSerializer(request.user, data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    serializer.save()
    response_data['response'] = 'Password successfully changed.'
    
    return Response(response_data)


@api_view(['PUT',])
@permission_classes([permissions.IsAuthenticated])
def detailsUpdateView(request):
    serializer = DetailsUpdateSerializer(request.user, data=request.data)
    response_data = {}

    serializer.is_valid(raise_exception=True)
    serializer.save()
    response_data['response'] = 'Account details successfully updated.'
   
    return Response(response_data)



########## Wypisuje wszystkich CustomUserów - do testów
class CustomUserListView(generics.ListAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


