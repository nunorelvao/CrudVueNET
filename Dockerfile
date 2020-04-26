#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["CrudVueNET.csproj", ""]
RUN dotnet restore "./CrudVueNET.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "CrudVueNET.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CrudVueNET.csproj" -c Release -o /app/publish


# build Vue app:
FROM node:alpine as buildvue

WORKDIR /src

COPY crud-clientapp/package.json .
RUN npm install

# webpack build
COPY crud-clientapp .
RUN npm run build


FROM base AS final
WORKDIR /app
# copy .net content
COPY --from=publish /app/publish .
# copy vue content into .net's static files folder:
COPY --from=buildvue /src/dist /app/wwwroot

ENTRYPOINT ["dotnet", "CrudVueNET.dll"]